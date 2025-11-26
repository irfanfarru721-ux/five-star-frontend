import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [activeModule, setActiveModule] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeVendor, setActiveVendor] = useState(null);

  // ---------- FETCH ALL DATA ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, modRes, catRes, subRes, venRes] = await Promise.all([
          axios.get("https://fivestar-backend.onrender.com/api/products"),
          axios.get("https://fivestar-backend.onrender.com/api/modules"),
          axios.get("https://fivestar-backend.onrender.com/api/categories"),
          axios.get("https://fivestar-backend.onrender.com/api/subcategories"),
          axios.get("https://fivestar-backend.onrender.com/api/vendors"),
        ]);

        setProducts(prodRes.data);
        setFiltered(prodRes.data);

        setModules(modRes.data);
        setCategories(catRes.data);
        setSubcategories(subRes.data);
        setVendors(venRes.data);
      } catch (err) {
        console.error("Error fetching backend data:", err);
      }
    };
    fetchData();
  }, []);

  // ---------- FILTER PRODUCTS ----------
  useEffect(() => {
    let list = products;

    if (activeModule) list = list.filter(p => p.module?._id === activeModule);
    if (activeCategory) list = list.filter(p => p.category?._id === activeCategory);
    if (activeSubcategory) list = list.filter(p => p.subcategory?._id === activeSubcategory);
    if (activeVendor) list = list.filter(p => p.vendor?._id === activeVendor);

    setFiltered(list);
  }, [activeModule, activeCategory, activeSubcategory, activeVendor, products]);

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* MODULE FILTER */}
      <h2 className="text-xl font-bold mb-2">Filter by Module</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setActiveModule(null); setActiveCategory(null); setActiveSubcategory(null); setActiveVendor(null); }}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          All
        </button>
        {modules.map(m => (
          <button
            key={m._id}
            onClick={() => { setActiveModule(m._id); setActiveCategory(null); setActiveSubcategory(null); setActiveVendor(null); }}
            className={`px-3 py-1 rounded ${activeModule === m._id ? 'bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* CATEGORY FILTER */}
      {activeModule && (
        <>
          <h2 className="text-xl font-bold mb-2">Filter by Category</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => { setActiveCategory(null); setActiveSubcategory(null); setActiveVendor(null); }}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              All
            </button>
            {categories.filter(c => c.module._id === activeModule).map(c => (
              <button
                key={c._id}
                onClick={() => { setActiveCategory(c._id); setActiveSubcategory(null); setActiveVendor(null); }}
                className={`px-3 py-1 rounded ${activeCategory === c._id ? 'bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* SUBCATEGORY FILTER */}
      {activeCategory && (
        <>
          <h2 className="text-xl font-bold mb-2">Filter by Subcategory</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => { setActiveSubcategory(null); setActiveVendor(null); }}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              All
            </button>
            {subcategories.filter(s => s.category?._id === activeCategory).map(s => (
              <button
                key={s._id}
                onClick={() => { setActiveSubcategory(s._id); setActiveVendor(null); }}
                className={`px-3 py-1 rounded ${activeSubcategory === s._id ? 'bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* VENDOR FILTER */}
      {activeSubcategory && (
        <>
          <h2 className="text-xl font-bold mb-2">Filter by Vendor</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => setActiveVendor(null)} className="px-3 py-1 bg-blue-500 text-white rounded">All</button>
            {vendors.filter(v => filtered.some(p => p.vendor?._id === v._id)).map(v => (
              <button
                key={v._id}
                onClick={() => setActiveVendor(v._id)}
                className={`px-3 py-1 rounded ${activeVendor === v._id ? 'bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {v.shopName}
              </button>
            ))}
          </div>
        </>
      )}

      {/* PRODUCT GRID */}
      <h2 className="text-xl font-bold mb-3">
        Showing: {activeVendor
          ? vendors.find(v => v._id === activeVendor)?.shopName
          : activeSubcategory
          ? subcategories.find(s => s._id === activeSubcategory)?.name
          : activeCategory
          ? categories.find(c => c._id === activeCategory)?.name
          : activeModule
          ? modules.find(m => m._id === activeModule)?.name
          : "All Products"}
      </h2>

      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center">No products found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <Link key={p._id} to={`/product/${p._id}`} className="border rounded p-3 hover:shadow transition">
              <img src={(p.images && p.images[0]) || p.image || "https://via.placeholder.com/300"} alt={p.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 font-semibold truncate">{p.name}</h3>
              <p className="text-sm text-gray-500">
                Module: {p.module?.name}<br/>
                Category: {p.category?.name}<br/>
                Subcategory: {p.subcategory?.name}<br/>
                Vendor: {p.vendor?.shopName}
              </p>
              <p className="text-green-600 font-bold">₹{p.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

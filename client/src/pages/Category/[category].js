// src/pages/CategoryPage.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import '../../styles/category.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [data, setData] = useState({
    products: [],
    tutorials: [],
    papers: [],
    posts: []
  });
  const [active, setActive] = useState('papers');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategoryContent = async () => {
      setIsLoading(true);
      try {
        const [productRes, videoRes, paperRes, postRes] = await Promise.all([
          supabase.from('products').select('*').eq('category', category),
          supabase.from('category_videos').select('*').eq('category', category),
          supabase.from('category_research').select('*').eq('category', category),
          supabase.from('category_community').select('*').eq('category', category),
        ]);

        setData({
          products: productRes.data || [],
          tutorials: videoRes.data || [],
          papers: paperRes.data || [],
          posts: postRes.data || []
        });
      } catch (err) {
        console.error('Failed to load content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) loadCategoryContent();
  }, [category]);

  if (isLoading) return <div className="loading-state">Loading {category} content...</div>;

  return (
    <div className="category-container">
      <h1 className="category-title">Explore {category}</h1>

      

      <section className="product-display">
        <h2>Top {category} Products</h2>
        <div className="product-list">
          {data.products.map(item => (
            <div className="product-entry" key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>Version: {item.latest_version}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="tab-toggle">
        <div className="tab-switch">
          <button onClick={() => setActive('papers')} className={active === 'papers' ? 'active' : ''}>Research Papers</button>
          <button onClick={() => setActive('posts')} className={active === 'posts' ? 'active' : ''}>Community Insights</button>
        </div>

        <div className="tab-content">
          {active === 'papers' && data.papers.map(doc => (
            <div key={doc.id} className="info-card">
              <h4><a href={doc.paper_url} target="_blank" rel="noreferrer">{doc.title}</a></h4>
              <p>{doc.summary}</p>
              <small>{new Date(doc.published_on).toLocaleDateString()}</small>
            </div>
          ))}

          {active === 'posts' && data.posts.map(post => (
            <div key={post.id} className="info-card">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post.url && <a href={post.url} target="_blank" rel="noreferrer">Read More</a>}
              <small>{new Date(post.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default CategoryPage;

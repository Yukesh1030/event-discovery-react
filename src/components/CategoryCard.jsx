import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import "./CategoryCard.css";

function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <Link to={`/explore?category=${encodeURIComponent(category.name)}`} className="category-card-link">
      <motion.article
        className={`category-card ${category.theme}`}
        whileHover={{ y: -7 }}
        transition={{ duration: 0.25 }}
      >
        <div className="category-card-top">
          <div className="category-icon">
            <Icon size={25} strokeWidth={1.8} />
          </div>

          <ArrowUpRight size={20} className="category-arrow" />
        </div>

        <div className="category-card-content">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>

        <div className="category-card-count">
          {category.count} EVENTS
        </div>
      </motion.article>
    </Link>
  );
}

export default CategoryCard;

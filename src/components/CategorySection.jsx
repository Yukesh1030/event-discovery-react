
import { Code2, BriefcaseBusiness, Palette, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

import CategoryCard from "./CategoryCard";

import "./CategorySection.css";

const categories = [
  {
    id: 1,
    name: "Technology",
    description: "Explore innovation and emerging technologies.",
    count: "12+",
    icon: Code2,
    theme: "category-technology",
  },
  {
    id: 2,
    name: "Business",
    description: "Build connections and grow your career.",
    count: "08+",
    icon: BriefcaseBusiness,
    theme: "category-business",
  },
  {
    id: 3,
    name: "Design",
    description: "Discover creativity and design thinking.",
    count: "06+",
    icon: Palette,
    theme: "category-design",
  },
  {
    id: 4,
    name: "Education",
    description: "Learn new skills from industry experts.",
    count: "10+",
    icon: GraduationCap,
    theme: "category-education",
  },
];

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">

        <motion.div
          className="category-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">
            EXPLORE BY INTEREST
          </span>

          <h2>
            Find your <span>community.</span>
          </h2>

          <p>
            From technology to creativity, discover experiences
            that match your interests.
          </p>
        </motion.div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;

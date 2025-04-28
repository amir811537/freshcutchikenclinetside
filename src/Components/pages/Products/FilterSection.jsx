import PropTypes from "prop-types";

const FilterSection = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-4 my-6">
      {categories.map((category) => (
        <label key={category} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="checkbox checkbox-warning"
          />
          <span className="text-sm font-medium">{category}</span>
        </label>
      ))}
    </div>
  );
};

FilterSection.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default FilterSection;

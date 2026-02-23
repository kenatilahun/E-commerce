
// for mapping over categories(frontend/src/components/catagoryItem.jsx)
import { useGetCategoriesQuery } from "../redux/ApiSlices/categoryApiSlice";
import { useEffect } from "react";
import { useState } from "react";
// import CategoryItem from "../components/CategoryItem";
import { Link } from "react-router-dom";

const CategorySidebar = () => {
	
	  const [open,setopen]=useState(false);
	  const HandleToggle=()=>{
		setopen(!open); }
		
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  return ( 
	<div >
      <button onClick={HandleToggle}>≡Category </button> 
    {open&&(<div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 `}>
		{categories.map((cat) => (
        <Link key={cat._id} to={`/category/${cat.slug}`}>
          {cat.name}
        </Link>
      ))}</div>
    )}


 </div>
  );
};

export default CategorySidebar;






















































// fetching all categories name
//  from  backend


// const {fetchcategoryname,isLoading,error} = useProductStore();


//  define category button menu which when clicked category items name will be fetched
// const CategoryMenu= () => {
	
// 	useEffect(() => {
// 		fetchcategoryname();
// 	}, [fetchcategoryname]);

// 	return (
		
// 			<div>
				

// 				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
// 					{fetchcategoryname.map((category56) => (
// 						<CategoryItem category={category56} key={category56.name} />
// 					))}
// 				</div>

				
// 			</div>
		
// 	);
// };








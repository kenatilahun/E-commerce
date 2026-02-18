// import { useSearchParams } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import { useGetProductsQuery } from '../slices/productsApiSlice';

// const ProductListPage = () => {
//   const [searchParams] = useSearchParams();

//   const pageNumber = searchParams.get('page') || 1;
//   const keyword = searchParams.get('keyword') || '';

//   const {
//     data,
//     isLoading,
//     error,
//   }=useGetProductsQuery({ keyword, pageNumber });

//   if (isLoading) return <Loader />;
//   if (error) return <Message variant="danger">{error?.data?.message}</Message>;

//   return (
//     <>
//       <h1>Products</h1>

//       <div className="product-grid">
//         {data.products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>

//       {/* Pagination (basic idea)
//       <div className="pagination">
//         {[...Array(data.pages).keys()].map((x) => (
//           <a
//             key={x + 1}
//             href={`?page=${x + 1}`}
//             className={x + 1 === data.page ? 'active' : ''}
//           >
//             {x + 1}
//           </a>
//         ))}
//       </div> */}
//     </>
//   );
// };

// export default ProductListPage;

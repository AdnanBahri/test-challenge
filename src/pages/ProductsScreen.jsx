import React, { useEffect, useState } from "react";
import Client from "../api/client";
import {
  CREATE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_CATEGORY_BY_ID,
  DELETE_PRODUCT_BY_ID,
  RETRIEVE_PRODUCTS,
  RETRIEVE_CATEGORIES,
  UPDATE_PRODUCT_BY_ID,
  UPDATE_CATEGORY_BY_ID,
} from "../utils/endpoints";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Field from "../components/field";
import Modal from "../components/modal";
import Category from "../components/category";
import ProductCard from "../components/product";

const initialValues = {
  nom: "",
  slug: "",
  stock: "",
  categorie: "",
};

const initialCategory = {
  _id: "",
  nom: "",
};

const productSchema = Yup.object().shape({
  nom: Yup.string().required("You Must Enter the Product Name"),
  stock: Yup.number().max(999).required("You Must Enter the Product Stock"),
  slug: Yup.string().max(50).required("You Must Enter The Product Slug"),
  // categorie: Yup.string().required("Enter a Category for This Product"),
});

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(initialValues);
  const [isModalVisibile, setIsModalVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sCategory, setSelectedCategory] = useState(null);

  const handleProductSubmit = async (values) => {
    if (!sCategory) return;
    try {
      const resp = await Client.post(CREATE_PRODUCT, {
        ...values,
        categorie: sCategory._id,
      });
      const data = await resp?.data;
      console.log(data);
      setReload(true);
    } catch (error) {
      console.log(error);
      setReload(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleSelectingProduct = (product) => {
    setProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setProduct(initialValues);
    setIsModalVisible(false);
  };

  const handleProductUpdate = async (values) => {
    try {
      const resp = await Client.put(
        `${UPDATE_PRODUCT_BY_ID}/${product._id}`,
        values
      );
      const data = await resp?.data;
      setReload(true);
      closeModal();
      console.log(data);
    } catch (error) {
      console.log(error);
      setReload(false);
    }
  };

  const handleDelete = () => {};

  const fetchProducts = async () => {
    try {
      const resp = await Client.get(RETRIEVE_PRODUCTS);
      const data = await resp?.data;
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const resp = await Client.get(RETRIEVE_CATEGORIES);
      const data = await resp?.data;
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (reload) fetchProducts();
  }, [reload]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await Client.get(RETRIEVE_PRODUCTS);
        const data = await resp?.data;
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (reload) fetchProducts();
  }, [reload]);

  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col mx-auto pt-28 pb-10 px-4">
      <div className="w-full flex items-center space-x-4">
        {categories.map((item) => (
          <Category
            selected={sCategory && item._id === sCategory._id}
            category={item}
            key={item._id}
            click={handleCategoryClick}
          >
            {item.nom}
          </Category>
        ))}
      </div>
      <div className="my-4 p-4 bg-white rounded-md shadow-sm">
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={productSchema}
          onSubmit={handleProductSubmit}
        >
          {({
            isValid,
            isSubmitting,
            errors,
            values,
            handleBlur,
            handleSubmit,
            handleChange,
            touched,
          }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
              <Field
                name="nom"
                label="Product Name"
                type="text"
                placeholder="Enter Product Name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.nom}
                touched={touched.nom}
                error={errors.nom}
              />

              <Field
                name="slug"
                label="Product Slug"
                type="test"
                placeholder="Enter The Product Slug"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.slug}
                touched={touched.slug}
                error={errors.slug}
              />
              <Field
                name="stock"
                label="Stock"
                type="text"
                placeholder="Product Quantity in Stock"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.stock}
                touched={touched.stock}
                error={errors.stock}
              />
              <Field
                name="categorie"
                label="Product Categorie"
                type="text"
                disabled={true}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={sCategory ? sCategory.nom : "Select a Category"}
                // value={values.categorie}
                touched={touched.categorie}
                error={!sCategory && "Please Select a Category Above"}
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="items-center justify-center mt-2 px-4 py-3 max-w-[200px] text-base font-semibold text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-md inline-flex hover:bg-slate-800 focus:bg-slate-800"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full grid gap-x-4 gap-y-3 grid-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-8">
        {products.map((product) => (
          <ProductCard
            click={() => handleSelectingProduct(product)}
            {...product}
            key={product.nom}
          />
        ))}
      </div>
      {isModalVisibile && (
        <Modal>
          <div className="w-full max-w-md bg-white rounded-md flex flex-col relative">
            <button
              onClick={closeModal}
              className="absolute p-1 top-2 right-2 text-white bg-slate-900 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Formik
              initialValues={product}
              validationSchema={productSchema}
              onSubmit={handleProductUpdate}
            >
              {({
                isValid,
                isSubmitting,
                errors,
                values,
                handleBlur,
                handleSubmit,
                handleChange,
                touched,
              }) => (
                <Form className="flex flex-col px-4 py-8 space-y-2">
                  <Field
                    name="nom"
                    label="Product Name"
                    type="text"
                    placeholder="Enter Product Name"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.nom}
                    touched={touched.nom}
                    error={errors.nom}
                  />

                  <Field
                    name="slug"
                    label="Product Slug"
                    type="test"
                    placeholder="Enter The Product Slug"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.slug}
                    touched={touched.slug}
                    error={errors.slug}
                  />
                  <Field
                    name="stock"
                    label="Produt Quantity"
                    type="text"
                    placeholder="Enter Quantity"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.stock}
                    touched={touched.stock}
                    error={errors.stock}
                  />
                  <Field
                    name="categorie"
                    label="Product Categorie"
                    type="text"
                    placeholder="Enter Product Categorie"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    disabled
                    value={
                      categories.filter((item) => item._id === product._id)[0]
                    }
                    touched={touched.categorie}
                    error={errors.categorie}
                  />
                  <div className="w-full flex justify-between items-center">
                    <button
                      onClick={handleSubmit}
                      className="items-center justify-center flex-1 px-4 py-3 max-w-[200px] text-base font-semibold text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-md inline-flex hover:bg-slate-800 focus:bg-slate-800"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleDelete}
                      className="items-center justify-center flex-1 px-4 py-3 max-w-[200px] text-base font-semibold text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md inline-flex hover:bg-red-700 focus:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductsScreen;

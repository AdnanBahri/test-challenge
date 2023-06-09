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
import ClientCard from "../components/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Field from "../components/field";
import Modal from "../components/modal";

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
  slug: Yup.string()
    .min(10)
    .max(30)
    .required("You Must Enter The Product Slug"),
  categorie: Yup.number().required("Enter a Category for This Product"),
});

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sCategory, setSelectedCategory] = useState(initialCategory);

  const handleProductSubmit = async (values) => {
    if (sCategory._id === "") return;
  };

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
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col mx-auto pt-28 pb-10 px-4">
      <div className="w-full flex items-center space-x-4">
        {categories.map((item) => (
          <div
            onClick={() => setSelectedCategory(item)}
            className={`p-4 rounded-md bg-white shadow-sm text-base font-medium text-slate-900 inline-flex items-center justify-center cursor-pointer ${
              sCategory._id === item._id && "bg-slate-900 text-white"
            }`}
            key={item._id}
          >
            {item.nom}
          </div>
        ))}
      </div>
      <div className="my-4 p-4 bg-white rounded-md shadow-sm">
        <Formik
          initialValues={{ ...initialValues, categorie: sCategory._id }}
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
                placeholder="Enter Product Categorie id"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.categorie}
                touched={touched.categorie}
                error={errors.categorie}
              />
              <button
                onClick={handleSubmit}
                className="items-center justify-center px-4 py-3 max-w-[200px] text-base font-semibold text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-md inline-flex hover:bg-slate-800 focus:bg-slate-800"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductsScreen;

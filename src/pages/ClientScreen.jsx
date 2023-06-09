import React, { useEffect, useState } from "react";
import Client from "../api/client";
import {
  CREATE_CLIENT,
  DELETE_CLIENT_BY_ID,
  RETRIEVE_CLIENTS,
  UPDATE_CLIENT_BY_ID,
} from "../utils/endpoints";
import ClientCard from "../components/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Field from "../components/field";
import Modal from "../components/modal";

const initialValues = {
  nom: "",
  telephone: "",
  adresse: "",
  sousDomaine: "",
};

const clientSchema = Yup.object().shape({
  nom: Yup.string().required("You Must Enter the Client Name"),
  adresse: Yup.string().required("You Must Enter the Client Address"),
  telephone: Yup.string()
    .min(10)
    .max(30)
    .required("You Must Enter The Client Phone Number"),
  sousDomaine: Yup.string().required("Enter a SubDomain for This Client"),
});

const ClientScreen = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [isVisivle, setIsVisible] = useState(false);
  const [isModalVisible, setModalIsVisivle] = useState(false);
  const [selectedClient, setSelectedClient] = useState(initialValues);

  const handleClientSubmit = async (values) => {
    try {
      const resp = await Client.post(CREATE_CLIENT, values);
      const data = await resp?.data;
      setClients([...clients, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientUpdate = async (values) => {
    try {
      const resp = await Client.put(
        `${UPDATE_CLIENT_BY_ID}/${selectedClient._id}`,
        values
      );
      const data = await resp?.data;
      setClients([...clients, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await Client.delete(
        `${DELETE_CLIENT_BY_ID}/${selectedClient._id}`
      );
      const data = await resp?.data;
      setClients([...clients, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectingClient = (client) => {
    setSelectedClient(client);
    setModalIsVisivle(true);
  };

  const closeModal = () => {
    setSelectedClient(initialValues);
    setModalIsVisivle(false);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const resp = await Client.get(RETRIEVE_CLIENTS);
        const data = await resp?.data;
        setClients(data);
      } catch (error) {
        console.log();
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col mx-auto pt-28 pb-10 px-4">
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="max-w-[150px] px-4 py-3 inline-flex items-center justify-center text-base font-semibold text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-md hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
      >
        Add Clients
      </button>
      {isVisivle && (
        <div className="my-4 p-4 bg-white rounded-md shadow-sm relative">
          <button
            onClick={() => setIsVisible(false)}
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
            initialValues={initialValues}
            validationSchema={clientSchema}
            onSubmit={handleClientSubmit}
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
                  label="Client Name"
                  type="text"
                  placeholder="Enter Client Name"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.nom}
                  touched={touched.nom}
                  error={errors.nom}
                />

                <Field
                  name="adresse"
                  label="Client Address"
                  type="test"
                  placeholder="Enter The Client address"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.adresse}
                  touched={touched.adresse}
                  error={errors.adresse}
                />
                <Field
                  name="telephone"
                  label="Client Phone"
                  type="text"
                  placeholder="Enter Client Phone"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.telephone}
                  touched={touched.telephone}
                  error={errors.telephone}
                />
                <Field
                  name="sousDomaine"
                  label="Client Subdomain"
                  type="text"
                  placeholder="Enter Client Sub Domain"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.sousDomaine}
                  touched={touched.sousDomaine}
                  error={errors.sousDomaine}
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
      )}
      <div className="w-full grid gap-x-4 gap-y-3 grid-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-8">
        {clients.map((client) => (
          <ClientCard
            click={() => handleSelectingClient(client)}
            {...client}
            key={client.nom}
          />
        ))}
      </div>
      {isModalVisible && (
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
              initialValues={selectedClient}
              validationSchema={clientSchema}
              onSubmit={handleClientUpdate}
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
                    label="Client Name"
                    type="text"
                    placeholder="Enter Client Name"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.nom}
                    touched={touched.nom}
                    error={errors.nom}
                  />

                  <Field
                    name="adresse"
                    label="Client Address"
                    type="test"
                    placeholder="Enter The Client address"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.adresse}
                    touched={touched.adresse}
                    error={errors.adresse}
                  />
                  <Field
                    name="telephone"
                    label="Client Phone"
                    type="text"
                    placeholder="Enter Client Phone"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.telephone}
                    touched={touched.telephone}
                    error={errors.telephone}
                  />
                  <Field
                    name="sousDomaine"
                    label="Client Subdomain"
                    type="text"
                    placeholder="Enter Client Sub Domain"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.sousDomaine}
                    touched={touched.sousDomaine}
                    error={errors.sousDomaine}
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

export default ClientScreen;

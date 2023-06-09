import React, { useEffect, useState } from "react";
import Client from "../api/client";
import { CREATE_CLIENT, RETRIEVE_CLIENTS } from "../utils/endpoints";
import ClientCard from "../components/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Field from "../components/field";

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
  const [isVisivle, setTsVisivle] = useState(false);

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
        onClick={() => setTsVisivle((prev) => !prev)}
        className="max-w-[150px] px-4 py-3 inline-flex items-center justify-center text-base font-semibold text-white transition-all duration-200 bg-slate-900 border border-transparent rounded-md hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
      >
        Add Clients
      </button>
      {isVisivle && (
        <div className="my-4 p-4 bg-white rounded-md shadow-sm">
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
          <ClientCard {...client} key={client.nom} />
        ))}
      </div>
    </div>
  );
};

export default ClientScreen;

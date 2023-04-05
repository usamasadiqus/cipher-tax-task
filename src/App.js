import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { DummyData } from "./jsonData";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const App = () => {
  const [bracelets, setBracelets] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setBracelets(
      DummyData.filter((data) => data?.category?.name === "Bracelets")
    );
    setQuestions(
      DummyData.filter((data) => data?.category?.name !== "Bracelets")
    );
  }, []);

  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;

    if (type === "Bracelets") {
      if (name === "allSelect") {
        setBracelets(
          bracelets.map((bracelet) => ({ ...bracelet, isChecked: checked }))
        );
      } else {
        const index = bracelets.findIndex((bracelet) => bracelet.name === name);
        setBracelets([
          ...bracelets.slice(0, index),
          { ...bracelets[index], isChecked: checked },
          ...bracelets.slice(index + 1),
        ]);
      }
    } else {
      if (name === "allSelect") {
        setQuestions(
          questions.map((question) => ({ ...question, isChecked: checked }))
        );
      } else {
        const index = questions.findIndex((question) => question.name === name);
        setQuestions([
          ...questions.slice(0, index),
          { ...questions[index], isChecked: checked },
          ...questions.slice(index + 1),
        ]);
      }
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const checkedBracelets = bracelets.filter((bracelet) => bracelet.isChecked);
    const checkedQuestions = questions.filter((question) => question.isChecked);

    const checkedItemIDs = [...checkedBracelets, ...checkedQuestions].map(
      (item) => item.id
    );

    const taxInfo = {
      applicable_items: checkedItemIDs,
      applied_to: values.applied_to,
      name: values.numberInText,
      rate: values.rate / 100,
    };

    console.log("taxInfo", taxInfo);

    resetForm();
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="header">
          <p>Add Tax</p>
          <p>x</p>
        </div>
        <Formik
          initialValues={{
            numberInText: "",
            rate: 0,
            applied_to: 0,
            applicable_items: [],
          }}
          validationSchema={Yup.object({
            numberInText: Yup.string().required("Required"),
            rate: Yup.number()
              .required("Required")
              .positive("Must be positive"),
            applied_to: Yup.string().required("Required"),
            applicable_items: Yup.array("number"),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <div className="num-inputs">
                <Input
                  placeholder="Basic usage"
                  name="numberInText"
                  onChange={handleChange}
                  value={values.numberInText}
                />
                <Space>
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={(val) => setFieldValue("rate", val)}
                    value={values.rate}
                  />
                </Space>
              </div>
              <div className="rad-inputs">
                <Radio.Group
                  name="applied_to"
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value === 1) {
                      setBracelets(
                        bracelets.map((bracelet) => ({
                          ...bracelet,
                          isChecked: true,
                        }))
                      );
                      setQuestions(
                        questions.map((question) => ({
                          ...question,
                          isChecked: true,
                        }))
                      );
                    }
                  }}
                  value={values.applied_to}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Apply to all items in collection</Radio>
                    <Radio value={2}>Apply to specific items</Radio>
                  </Space>
                </Radio.Group>
              </div>
              <hr />
              <div className="search-inputs">
                <Input placeholder="Search Items" prefix={<SearchOutlined />} />
              </div>
              <div className="form-check parent">
                <Field
                  type="checkbox"
                  name="allSelect"
                  className="form-check-input"
                  checked={
                    !bracelets.some((bracelet) => bracelet?.isChecked !== true)
                  }
                  onChange={(e) => handleCheckboxChange(e, "Bracelets")}
                />
                <label className="form-check-label ms-2">Bracelets</label>
              </div>
              {bracelets.map((bracelet, index) => (
                <div className="form-check childrens" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={bracelet.name}
                    checked={bracelet?.isChecked || false}
                    onChange={(e) => handleCheckboxChange(e, "Bracelets")}
                  />
                  <label className="form-check-label ms-2">
                    {bracelet.name}
                  </label>
                </div>
              ))}
              <div className="form-check parent">
                <Field
                  type="checkbox"
                  name="allSelect"
                  className="form-check-input"
                  checked={
                    !questions.some((question) => question?.isChecked !== true)
                  }
                  onChange={(e) => handleCheckboxChange(e, "Questions")}
                />
                <label className="form-check-label ms-2">Questions</label>
              </div>
              {questions.map((question, index) => (
                <div className="form-check childrens" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={question.name}
                    checked={question?.isChecked || false}
                    onChange={(e) => handleCheckboxChange(e, "Questions")}
                  />
                  <label className="form-check-label ms-2">
                    {question.name}
                  </label>
                </div>
              ))}
              <hr />
              <div className="input-button">
                <Space wrap>
                  <Button className="warning" htmlType="submit">
                    Apply to item(s)
                  </Button>
                </Space>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default App;

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { DummyData } from "./jsonData";

const App = () => {
  const [numInText, setNumInText] = useState("");
  const [number, setNumber] = useState(0);
  const [bracelets, setBracelets] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [checkedItemIDs, setCheckedItemIDs] = useState([]);
  const [value, setValue] = useState(1);
  const [checkedBraceletsLength, setCheckedBraceletsLength] = useState(0);
  const [checkedQuestionsLength, setCheckedQuestionsLength] = useState(0);

  useEffect(() => {
    setBracelets(
      DummyData.filter((data) => data?.category?.name === "Bracelets")
    );
    setQuestions(
      DummyData.filter((data) => data?.category?.name !== "Bracelets")
    );
  }, []);

  const handleChange = (e, type) => {
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

    const checkedBracelets = bracelets.filter((bracelet) => bracelet.isChecked);
    const checkedQuestions = questions.filter((question) => question.isChecked);

    setCheckedBraceletsLength(checkedBracelets.length);
    setCheckedQuestionsLength(checkedQuestions.length);

    const braceletIDs = checkedBracelets.map((bracelet) => bracelet.id);
    const questionIDs = checkedQuestions.map((question) => question.id);

    setCheckedItemIDs([...braceletIDs, ...questionIDs]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taxInfo = {
      applicable_items: checkedItemIDs,
      applied_to: value === 1 ? "all" : "some",
      name: numInText,
      rate: number / 100,
    };

    console.log("taxInfo", taxInfo);
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="header">
          <p>Add Tax</p>
          <p>x</p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="num-inputs">
            <Input
              placeholder="Basic usage"
              onChange={(e) => setNumInText(e.target.value)}
              value={numInText}
            />
            <Space>
              <InputNumber
                defaultValue={0}
                min={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={(val) => setNumber(val)}
                value={number}
              />
            </Space>
          </div>
          <div className="rad-inputs">
            <Radio.Group
              onChange={(e) => setValue(e.target.value)}
              value={value}
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
            <input
              type="checkbox"
              className="form-check-input"
              name="allSelect"
              // checked={
              //   users.filter((user) => user?.isChecked !== true).length < 1
              // }
              checked={
                !bracelets.some((bracelet) => bracelet?.isChecked !== true)
              }
              onChange={(e) => handleChange(e, "Bracelets")}
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
                onChange={(e) => handleChange(e, "Bracelets")}
              />
              <label className="form-check-label ms-2">{bracelet.name}</label>
            </div>
          ))}
          <div className="form-check parent">
            <input
              type="checkbox"
              className="form-check-input"
              name="allSelect"
              // checked={
              //   users.filter((user) => user?.isChecked !== true).length < 1
              // }
              checked={
                !questions.some((question) => question?.isChecked !== true)
              }
              onChange={(e) => handleChange(e, "Questions")}
            />
            <label className="form-check-label ms-2"></label>
          </div>
          {questions.map((question, index) => (
            <div className="form-check childrens" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                name={question.name}
                checked={question?.isChecked || false}
                onChange={(e) => handleChange(e, "Questions")}
              />
              <label className="form-check-label ms-2">{question.name}</label>
            </div>
          ))}
          <hr />
          <div className="input-button">
            <Space wrap>
              <Button htmlType="submit" className="warning">
                Apply tax to {checkedBraceletsLength + checkedQuestionsLength}{" "}
                item(s)
              </Button>
            </Space>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;

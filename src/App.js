import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Radio, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { DummyData } from "./jsonData";

const App = () => {
  const [bracelets, setBracelets] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState(1);
  const [checkedItems, setCheckedItems] = useState();

  useEffect(() => {
    setBracelets(
      DummyData.filter((data) => data?.category?.name === "Bracelets")
    );
    setQuestions(
      DummyData.filter((data) => data?.category?.name !== "Bracelets")
    );
  }, []);

  const handleChangeForBracelets = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempBracelets = bracelets.map((bracelet) => {
        return { ...bracelet, isChecked: checked };
      });
      setBracelets(tempBracelets);
    } else {
      let tempBracelets = bracelets.map((bracelet) =>
        bracelet.name === name ? { ...bracelet, isChecked: checked } : bracelet
      );
      setBracelets(tempBracelets);
    }
  };

  const handleChangeForQuestions = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempQuestions = questions.map((question) => {
        return { ...question, isChecked: checked };
      });
      setQuestions(tempQuestions);
    } else {
      let tempQuestions = questions.map((question) =>
        question.name === name ? { ...question, isChecked: checked } : question
      );
      setQuestions(tempQuestions);
    }
  };

  const radioHandleChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="header">
          <p>Add Tax</p>
          <p>x</p>
        </div>
        <form>
          <div className="num-inputs">
            <Input placeholder="Basic usage" />
            <Space>
              <InputNumber
                defaultValue={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={onChange}
              />
            </Space>
          </div>
          <div className="rad-inputs">
            <Radio.Group onChange={radioHandleChange} value={value}>
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
              checked={!bracelets.some((brclts) => brclts?.isChecked !== true)}
              onChange={handleChangeForBracelets}
            />
            <label className="form-check-label ms-2">Bracelets</label>
          </div>
          {bracelets.map((brclts, index) => (
            <div className="form-check childrens" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                name={brclts.name}
                checked={brclts?.isChecked || false}
                onChange={handleChangeForBracelets}
              />
              <label className="form-check-label ms-2">{brclts.name}</label>
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
              checked={!questions.some((qustns) => qustns?.isChecked !== true)}
              onChange={handleChangeForQuestions}
            />
            <label className="form-check-label ms-2"></label>
          </div>
          {questions.map((qustns, index) => (
            <div className="form-check childrens" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                name={qustns.name}
                checked={qustns?.isChecked || false}
                onChange={handleChangeForQuestions}
              />
              <label className="form-check-label ms-2">{qustns.name}</label>
            </div>
          ))}
          <hr />
          <div className="input-button">
            <Space wrap>
              <Button className="warning">
                Apply tax to{" "}
                {bracelets.map((bracelet) => bracelet.isChecked).length +
                  questions.map((question) => question.isChecked).length}{" "}
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

{
  /* <div className="content">
  <div className="header">
    <h1>Add Tax</h1>
    <h1>x</h1>
  </div>
  <form>
    <div className="form">
      <div className="form">
        <div className="left">
          <input type="text" className="outline-none" />
        </div>
        <div className="right">
          <input type="number" className="outline-none" min="0" />
          <span>%</span>
        </div>
      </div>
    </div>
    <div className="radio-list">
      <div className="form-control">
        <input type="radio" name="rad" id="" />
        <label htmlFor="">Apply to all items in collection</label>
      </div>
      <div className="form-control">
        <input type="radio" name="rad" id="" />
        <label htmlFor="">Apply to specific items</label>
      </div>
    </div>
  </form>
  <hr />
</div>;
 */
}

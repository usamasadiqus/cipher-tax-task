import { UserOutlined } from "@ant-design/icons";
import { Input, InputNumber, Button, Space } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { DummyData } from "./jsonData";

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

  const handleChangeForBracelets = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempBrclts = bracelets.map((brclts) => {
        return { ...brclts, isChecked: checked };
      });
      setBracelets(tempBrclts);
    } else {
      let tempBrclts = bracelets.map((brclts) =>
        brclts.name === name ? { ...brclts, isChecked: checked } : brclts
      );
      setBracelets(tempBrclts);
    }
  };

  const handleChangeForQuestions = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempQustns = questions.map((qustns) => {
        return { ...qustns, isChecked: checked };
      });
      setQuestions(tempQustns);
    } else {
      let tempQustns = questions.map((qustns) =>
        qustns.name === name ? { ...qustns, isChecked: checked } : qustns
      );
      setQuestions(tempQustns);
    }
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <div className="container">
      <Input placeholder="Basic usage" />
      <Input placeholder="Basic usage" />
      <Space>
        <InputNumber
          defaultValue={1000}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={onChange}
        />
      </Space>
      <Input placeholder="default size" prefix={<UserOutlined />} />
      <hr />
      <div className="form-check">
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
        <div className="form-check" key={index}>
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
      <div className="form-check">
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
        <div className="form-check" key={index}>
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
      <Space wrap>
        <Button className="warning">Primary Button</Button>
      </Space>
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

import React, { FC, memo } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Back.module.scss";

const Back: FC = memo(() => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return <div onClick={handleBack} className={styles.back}></div>;
});

export default Back;

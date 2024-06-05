import styles from "./style.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={`${styles.loadingSpinner} swiper_spinner`}></div>
    </div>
  );
};

export default Loading;

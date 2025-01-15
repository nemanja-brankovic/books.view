interface Props {
  dark: boolean;
}

function MainTabButton({ dark }: Props) {
  const classes =
    "group inline-flex items-center justify-center text-xl md:text-2xl font-bold";
  const additionalClasses = dark
    ? " text-rose-500 hover:text-rose-500-lighter focus:text-rose-500-lightest"
    : " text-white px-6 py-3 rounded bg-rose-500 hover:bg-red-600 focus:bg-red-600";

  return (
    <div className="mt-12">
      <div className={classes + additionalClasses}>
        {dark ? "Prodaj" : "Kupi"}
        <svg
          className="ml-2 fill-current group-hover:translate-x-1 group-focus:translate-x-1"
          width="25"
          height="16"
          viewBox="0 0 25 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M25 7.99947C24.9989 7.56503 24.8167 7.1507 24.4971 6.85604L17.4153 0.285578C17.1043 -0.00338775 16.6514 -0.0806904 16.262 0.0887195C15.8726 0.258129 15.6207 0.642027 15.6206 1.06635V4.53291C15.6206 4.68018 15.5011 4.79957 15.3537 4.79957H10.0677C9.47801 4.79957 9 5.27712 9 5.8662V10.1327C9 10.7218 9.47801 11.1994 10.0677 11.1994H15.3537C15.5011 11.1994 15.6206 11.3188 15.6206 11.466V14.9326C15.6203 15.3571 15.872 15.7414 16.2615 15.9111C16.651 16.0807 17.1042 16.0035 17.4153 15.7144L24.4961 9.14503C24.816 8.84966 24.9986 8.43467 25 7.99947Z"></path>
          <path d="M5 6C5 5.44772 5.44772 5 6 5H7C7.55228 5 8 5.44772 8 6V10.5C8 11.0523 7.55228 11.5 7 11.5H6C5.44772 11.5 5 11.0523 5 10.5V6Z"></path>
          <path d="M0 6C0 5.44772 0.447715 5 1 5H2C2.55228 5 3 5.44772 3 6V10.5C3 11.0523 2.55228 11.5 2 11.5H1C0.447715 11.5 0 11.0523 0 10.5V6Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default MainTabButton;

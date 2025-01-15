interface Props {
  schoolType: "Srednja škola" | "Osnovna škola";
}

function SchoolBadge({ schoolType }: Props) {
  const color = schoolType === "Osnovna škola" ? "bg-teal-500" : "bg-teal-500";
  const classes =
    "absolute top-0 right-0 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold " +
    color;
  return <div className={classes}>{schoolType}</div>;
}

export default SchoolBadge;

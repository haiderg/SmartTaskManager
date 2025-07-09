interface Prop {
  success: boolean;
  message: string;
}

const AlertMessage = ({ success, message }: Prop) => {
  return (
    <div
      className={`alert ${success == true ? "alert-success" : "alert-danger"}`}
    >
      {message}
    </div>
  );
};

export default AlertMessage;

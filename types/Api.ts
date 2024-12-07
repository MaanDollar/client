export type ApiResponse<T> =
  | ({
      status: "success";
    } & T)
  | {
      status: "error";
      message: string;
    };

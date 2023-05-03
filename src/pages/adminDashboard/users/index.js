import React, { useContext, useEffect, useState } from "react";
import CustomTabs from "../../../../components/CustomTabs/CustomTabs";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import BoxShadowWrapper from "../../../../components/BoxShadowWrapper";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import { useRouter } from "next/router";
import { apiCall } from "@/utils/apiCall";
import CustomModal from "../../../../components/Modal/CustomModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CustomInputBox from "../../../../components/CustomInputBox/CustomInputBox";
import { toast } from "react-toastify";
import { DataContext } from "../../../../store/GlobalState";
import PaginationComponent from "../../../../components/PaginationComponent/PaginationComponent";

function Users() {
  const { state } = useContext(DataContext);
  const { auth } = state;
  const [page, setPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const tableHeadings = ["Id", "Name", "Email", "Admin", "Actions"];
  const [open, setOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [roleUpdateCallTriggered, setRoleUpdateCallTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [usersTableData, setUsersTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    isAdmin: false,
    id: "",
  });
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall(
          "GET",
          `user?page=${page}&limit=${productLimit}`,
          token
        );
        if (res?.data?.status === "success") {
          setTotalCount(res?.data?.Data?.totalCount);
          const formattedData = res?.data?.Data?.users?.map((user) => {
            return {
              firstCol: user?._id,
              secondCol: user?.name,

              thirdCol: user?.email,

              fourthCol:
                user?.root === true
                  ? "Root"
                  : user?.role === "admin"
                  ? "Admin"
                  : "User",
              fifthCol: (
                <Box>
                  <IconButton
                    onClick={() => {
                      handleDeleteModalOpen();
                      handleButtonClick(user);
                    }}
                    disabled={user?.root === true}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleClickOpen();
                      handleButtonClick(user);
                    }}
                    disabled={user?.root === true}
                  >
                    <ModeEditIcon />
                  </IconButton>
                </Box>
              ),
            };
          });
          setUsersTableData(formattedData);
          setUsers(res?.data?.Data);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [roleUpdateCallTriggered, page]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleButtonClick = (userData) => {
    setSelectedUser({
      name: userData?.name,
      isAdmin: userData?.role === "admin" ? true : false,
      id: userData?._id,
    });
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleUserUpdate = async (e) => {
    const data = {
      userId: selectedUser?.id,
      role: selectedUser?.isAdmin === true ? "admin" : "user",
      name: selectedUser?.name,
    };
    try {
      const res = await apiCall(
        "PATCH",
        `user/${selectedUser?.id}`,
        token,
        data
      );
      if (res?.data?.status === "success") {
        setRoleUpdateCallTriggered(!roleUpdateCallTriggered);
        toast.success("User updated!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await apiCall("DELETE", `user/${selectedUser?.id}`, token);
      if (res?.data?.status === "success") {
        setRoleUpdateCallTriggered(!roleUpdateCallTriggered);
        toast.success("User deleted!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    }
  };

  useEffect(() => {
    if (auth?.user?.role === "user") {
      router.push("/");
    }
  }, []);

  return (
    <Wrapper>
      <Box
        sx={{
          padding: "0px 10px",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <CustomTabs isAdminTabs={true} active={"Users"}>
          <BoxShadowWrapper>
            <TableComponent
              title={"Users"}
              // tableHeadings={[]}
              tableHeadingsStyle={{ fontSize: "18px" }}
              imageContainerStyle={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
              imageStyle={{ height: "100%", width: "100%", flex: 1 }}
              tableBodyStyle={{ fontSize: "18px" }}
              tableBodyData={usersTableData}
              tableHeadings={tableHeadings}
              isAdmin={true}
              type={"users"}
              handleTableCellClick={() => {}}
              align={"center"}
              handleEditCellClick={handleClickOpen}
              loadingState={isLoading}
              // handleDeleteCellClick={handleDeleteModalOpen}
            />
            {totalCount > 10 && (
              <PaginationComponent
                page={page}
                setPage={setPage}
                count={Math.ceil(totalCount / productLimit)}
              />
            )}
          </BoxShadowWrapper>
          <CustomModal
            open={open}
            setOpen={setOpen}
            modalTitle={"User Details"}
            agreedButtonName={"Update"}
            declineButtonName={"Cancel"}
            handleAgreedButtonClick={handleUserUpdate}
            showAgreedButton={true}
            showDeclineButton={true}
          >
            <CustomInputBox
              id={"name"}
              label={"Name"}
              name={"name"}
              value={selectedUser?.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              // errorValue={error?.name}
              inputStyle={{
                width: { xs: "100%", sm: "100%", md: "100%" },
              }}
              required={true}
              agreedButtonColor={"#539165"}
              declineButtonColor={"red"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedUser?.isAdmin}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      isAdmin: !selectedUser?.isAdmin,
                    })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Admin"
            />
          </CustomModal>
          <CustomModal
            open={deleteModalOpen}
            setOpen={setDeleteModalOpen}
            modalTitle={"Delete User?"}
            agreedButtonName={"Delete"}
            declineButtonName={"Cancel"}
            handleAgreedButtonClick={handleUserDelete}
            agreedButtonColor={"#539165"}
            declineButtonColor={"red"}
            showAgreedButton={true}
            showDeclineButton={true}
          >
            <Typography>
              Are you sure that you want to delete this user?
            </Typography>
          </CustomModal>
        </CustomTabs>
      </Box>
    </Wrapper>
  );
}

export default Users;

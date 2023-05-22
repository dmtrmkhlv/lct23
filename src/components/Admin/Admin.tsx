import { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { User } from "../../types/types";
import { useGetAllUsersQuery } from "../../features/api/usersAPI";
import { Paths } from "../../utils/paths";
import { CustomButton } from "../CustomButton/CustomButton";
import { FilterValue, SorterResult } from "antd/es/table/interface";

export default function Admin() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllUsersQuery();

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<User>>({});

  const handleChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<User>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "Имя",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Фамилия",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "admin", value: "admin" },
        { text: "mentor", value: "mentor" },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value: any, record) => record.role.includes(value),
      sorter: (a: any, b: any) => a.role.length - b.role.length,
      sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.userAdd);

  return (
    <>
      <CustomButton
        type="primary"
        onClick={gotToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        loading={isLoading}
        rowKey={(user) => user.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onChange={handleChange}
        onRow={(user) => {
          return {
            onClick: () => navigate(`${Paths.user}/${user.id}`),
          };
        }}
      />
    </>
  );
}

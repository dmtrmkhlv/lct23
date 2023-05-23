import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import { Role, User } from "../../types/types";
import { Paths } from "../../utils/paths";

type DataIndex = keyof User;

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllUsersQuery();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<User> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#542d80" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const changeRoleLang = (role: Role) => {
    switch (role) {
      case "curator":
        return "Куратор";
      case "intern":
        return "Стажер";
      case "mentor":
        return "Наставник";
      case "hr":
        return "Кадры";
      case "admin":
        return "Администратор";
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Имя",
      dataIndex: "firstName",
      key: "firstName",
      width: "30%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Фамилия",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Роль",
      dataIndex: "",
      key: "role",
      filters: [
        { text: "Куратор", value: "curator" },
        { text: "Администратор", value: "admin" },
        { text: "Стажер", value: "intern" },
        { text: "Наставник", value: "mentor" },
        { text: "Кадры", value: "hr" },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.role.includes(value),
      width: "30%",
      render: (record) =>
        // <Link to={`${Paths.user}/${record.role}`}>
        changeRoleLang(record.role),
        // </Link>
    },
    {
      title: "Правка",
      dataIndex: "",
      key: "edit",
      render: (record) => (
        <Link to={`${Paths.user}/${record.id}`}>Редактировать</Link>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey={(user) => user.id}
    />
  );
};

export default Admin;

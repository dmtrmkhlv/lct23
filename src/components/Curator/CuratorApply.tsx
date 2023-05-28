import { SearchOutlined } from "@ant-design/icons";
import { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersApplyQuery } from "../../features/api/usersAPI";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../utils/paths";
import { changeCitizenship } from "../../utils/changeCitizenship";
import { UserApplyType } from "../../types/UserApplyType";

type DataIndex = keyof UserApplyType;

export default function CuratorApply() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllUsersApplyQuery();

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<UserApplyType> => ({
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
    // onFilter: (value, record) => {
    //   if (record[dataIndex] === undefined) {
    //     return false;
    //   }
    //   return record[dataIndex]
    //     ?.toString()
    //     .toLowerCase()
    //     .includes((value as string).toLowerCase());
    // },
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

  const columns: ColumnsType<UserApplyType> = [
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
      title: "Гражданство",
      dataIndex: "",
      key: "citizenship",
      filters: [
        { text: "РФ", value: "ru" },
        { text: "Не РФ", value: "notru" },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.citizenship.includes(value),
      width: "30%",
      render: (record) =>
        // <Link to={`${Paths.user}/${record.role}`}>
        changeCitizenship(record.citizenship),
      // </Link>
    },
    {
      title: "Возраст",
      dataIndex: "",
      key: "age",
      filters: [
        { text: "РФ", value: "ru" },
        { text: "Не РФ", value: "notru" },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.citizenship.includes(value),
      width: "30%",
      render: (record) =>
        // <Link to={`${Paths.user}/${record.role}`}>
        changeCitizenship(record.citizenship),
      // </Link>
    },
    {
      title: "Информация",
      dataIndex: "",
      key: "edit",
      render: (record) => (
        <Link to={`${Paths.user}/${record.id}`}>Подробнее</Link>
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
}

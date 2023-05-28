import { SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { InputRef, Modal } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import {
  useConfirmUserApplyMutation,
  useGetAllUsersApplyQuery,
} from "../../features/api/usersAPI";
import { Paths } from "../../utils/paths";
import { changeCitizenship } from "../../utils/changeCitizenship";
import { UserApplyType } from "../../types/UserApplyType";
import { CustomButton } from "../CustomButton/CustomButton";
import { ToolOutlined } from "@ant-design/icons";
import AutoSearchForm from "./AutoSearchForm";
import { IFilterFormDataAutoSearch } from "../../types/IFilterFormDataAutoSearch";
import { changeStudyGrade } from "../../utils/changeStudyGrade";
import Load from "../Load/Load";

type DataIndex = keyof UserApplyType;

export default function CuratorApply() {
  const [idToConfirm, setIdToConfirm] = useState<React.Key[]>([]);
  const { data, isLoading } = useGetAllUsersApplyQuery(idToConfirm);
  const [confirmUserApply, {}] = useConfirmUserApplyMutation();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataTable, setDataTable] = useState(data);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

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
    onFilter: (value, record) => {
      if (record[dataIndex] === undefined) {
        return false;
      }
      return record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
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
      render: (record) => changeCitizenship(record.citizenship),
    },
    {
      title: "Возраст",
      dataIndex: "",
      key: "age",
      render: (record) => record.age,
    },
    {
      title: "Уровень образования",
      dataIndex: "",
      key: "studyGrade",
      render: (record) => changeStudyGrade(record.studyGrade),
    },
    {
      title: "Опыт (мест работы)",
      dataIndex: "",
      key: "experience",
      render: (record) => {
        if (record.experience.length >= 3) {
          return "3 и более";
        }
        return record.experience.length;
      },
    },
    {
      title: "Информация",
      dataIndex: "",
      key: "edit",
      render: (record) => (
        <Link to={`${Paths.userApply}/${record.id}`}>Подробнее</Link>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const getFilterData = (
    filterParams: IFilterFormDataAutoSearch
  ): UserApplyType[] | undefined => {
    const filterDataTable = data?.filter((el: UserApplyType) => {
      if (filterParams.hasExperience) {
        return (
          el.age >= filterParams.minAge &&
          el.age <= filterParams.maxAge &&
          el.citizenship === filterParams.citizenship &&
          el.experience.length >= 3 &&
          el.studyGrade === filterParams.studyGrade
        );
      }
      return (
        el.age >= filterParams.minAge &&
        el.age <= filterParams.maxAge &&
        el.citizenship === filterParams.citizenship &&
        el.studyGrade === filterParams.studyGrade
      );
    });
    console.log(filterDataTable);
    setDataTable(filterDataTable);
    return dataTable;
  };

  const handleOk = () => {
    setConfirmLoading(true);
    // setTimeout(() => {
    setOpen(false);
    setConfirmLoading(false);

    // }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setIdToConfirm(selectedRowKeys);
    console.log(selectedRowKeys);
    confirmUserApply(selectedRowKeys);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  if (isLoading) {
    return <Load />;
  }
  return (
    <>
      <CustomButton type="primary" onClick={showModal} icon={<ToolOutlined />}>
        Параметры автоматической проверки
      </CustomButton>
      <CustomButton
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
        icon={<CheckOutlined />}
      >
        Одобрить выбранные заявки
      </CustomButton>
      <Table
        columns={columns}
        dataSource={dataTable}
        loading={isLoading}
        rowKey={(user) => user.id}
        rowSelection={rowSelection}
      />
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: true }}
        footer={null}
      >
        <AutoSearchForm getFilterData={getFilterData} onOk={handleOk} />
      </Modal>
    </>
  );
}

import {
  CloseOutlined,
  PlusOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Avatar, Button, ColorPicker, DatePicker, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SelectTag } from "../SelectTag";
import { DropdownSelect } from "../SelectUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/configs/api";
import { queryClient } from "@/main";
import { LIST_CATEGORY, LIST_TASK, LIST_USER } from "@/configs/queryKey";
import { categoryService } from "@/services/category";
import { userService } from "@/services/user";
import { useForm } from "antd/es/form/Form";

export const PopupNewTask = ({ open, onCancel }) => {
const [form] = useForm()
  const { mutate, isLoading } = useMutation({
    mutationFn: (value) => {
      return axiosInstance.post("/task", value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([LIST_TASK]);
      onCancel();
    },
  });

  const { data: categories } = useQuery({
    queryKey: [LIST_CATEGORY],
    queryFn: categoryService.getCategories,
  });

  const { data: users } = useQuery({
    queryKey: [LIST_USER],
    queryFn: userService.getUsers,
  });
  return (
    <Modal
      maskClosable={false}
      open={open}
      onCancel={onCancel}
      width={520}
      title={
        <div className="text-xl text-center border-0 border-b border-solid border-gray-200 pb-4">
          Create task
        </div>
      }
      footer={null}
    >
      <Form layout="vertical py-4" onFinish={mutate} form={form}>
        <Form.Item
          name="title"
          rules={[{ required: true }]}
          label="Task title"
          className=""
        >
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <ColorPicker defaultValue="#ffffff" onChangeComplete={value => form.setFieldValue('color', value.toHexString())}/>
        </Form.Item>
        <Form.Item
          // rules={[{ required: true }]}
          name="category"
          label="Category"
        >
          <SelectTag
            options={
              categories?.map((e) => ({ label: e.name, value: e.id })) || []
            }
          />
        </Form.Item>
        <div className="flex w-full gap-2 mt-2">
          <Form.Item
            name="startDate"
            // rules={[{ required: true }]}
            label="Starts"
            className="flex-1"
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>
          <Form.Item
            name="endDate"
            // rules={[{ required: true }]}
            label="Ends"
            className="flex-1"
          >
            <DatePicker showTime className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          name="users"
          // rules={[{ required: true }]}
          label="Participants"
        >
          <DropdownSelect
            options={
              users?.map((e) => ({
                ...e,
                value: e.id,
                label: (
                  <Button size="small" className="flex items-center w-full">
                    <Avatar
                      className="mr-2"
                      size={28}
                      src="https://placehold.co/100x100"
                    />{" "}
                    {e.name} <PlusOutlined />
                  </Button>
                ),
              })) || []
            }
            renderSelected={({ option: user, remove }) => (
              <Button onClick={remove} className="flex items-center p-2">
                <Avatar className="mr-2" size={28} src={user.avatar} />{" "}
                {user.name} <CloseOutlined />
              </Button>
            )}
          />
        </Form.Item>
        <Form.Item label="Location">
          <Input prefix={<PushpinOutlined />} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          className="w-full bg-accent"
        >
          Create task
        </Button>
      </Form>
    </Modal>
  );
};

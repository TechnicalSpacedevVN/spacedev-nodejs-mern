import React, { useState } from "react";
import PushpinOutlined from "@ant-design/icons/PushpinOutlined";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Skeleton, Tooltip, message } from "antd";
import { cn } from "@/utils";
import { PopupNewTask } from "@/components/PopupNewTask";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/configs/api";
import { IconThreeDotVertical } from "@/components/IconThreeDotVertical";
import { queryClient } from "@/main";
import { LIST_TASK } from "@/configs/queryKey";

export const Home = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [LIST_TASK],
    queryFn: () => {
      return axiosInstance.get("/task");
    },
  });

  return (
    <div className="max-w-[600px] p-10 mx-auto ">
      <Button
        onClick={() => setOpenCreate(true)}
        className="w-full mb-4 bg-accent"
        type="primary"
      >
        Create new Task
      </Button>
      <div className="flex gap-2 flex-col">
        {isLoading &&
          Array.from(new Array(5)).map((_, i) => (
            <Skeleton.Input style={{ height: 200, width: "100%" }} />
          ))}
        {data?.map((e) => (
          <ToDoCard key={e.id} {...e} />
        ))}
        {/* <ToDoCard className="bg-red-50" />
        <ToDoCard className="bg-blue-50" />
        <ToDoCard className="bg-yellow-50" />
        <ToDoCard className="bg-orange-50" /> */}
      </div>
      <PopupNewTask open={openCreate} onCancel={() => setOpenCreate(false)} />
    </div>
  );
};

const ToDoCard = ({
  className,
  title,
  description,
  id,
  users,
  category,
  color,
}) => {
  const { mutate } = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(`/task/${id}`);
    },
    onMutate: () => {
      message.loading({
        key: id,
        content: "Đang xóa task",
      });
    },
    onSuccess: () => {
      message.success({
        key: id,
        content: "Xóa task thành công",
      });
      queryClient.invalidateQueries([LIST_TASK]);
    },
    onError: () => {
      message.error({
        key: id,
        content: "Xóa task thất bại",
      });
    },
  });

  return (
    <div
      className={cn("p-4 rounded-lg relative", className)}
      style={{ background: `${color}20` }}
    >
      <h3 className="text-lg font-[600] flex items-center justify-between">
        <span>{title}</span>
        <p>{category?.name}</p>
      </h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="text-blue-400 cursor-pointer mt-2 pb-3 border-0 border-solid border-b border-gray-300">
        <PushpinOutlined /> Marlowe
      </div>
      <div className="mt-2 font-[400] flex justify-between items-center">
        <div className="text-sm text-gray-800">
          <ClockCircleOutlined /> 4:30 PM - 5:45 PM
        </div>
        <div>
          <Avatar.Group>
            {users?.map((e) => {
              console.log(e)
              return (
                <Tooltip key={e.id} title={e.name}>
                  <Avatar
                    size={35}
                    src={e?.avatar || "https://placehold.co/100x100"}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </div>
      </div>
      <Dropdown
        menu={{
          items: [
            {
              label: "Delete",
              onClick: mutate,
            },
            {
              label: "Update",
            },
          ],
        }}
      >
        <i className="absolute top-1 right-1 cursor-pointer">
          <IconThreeDotVertical width={13} />
        </i>
      </Dropdown>
    </div>
  );
};

export default Home;

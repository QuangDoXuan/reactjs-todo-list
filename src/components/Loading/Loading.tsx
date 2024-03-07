import { Spin } from "antd"

export const Loading = () => {
  return <div className="loading-spin"><Spin spinning={true}></Spin></div>
}
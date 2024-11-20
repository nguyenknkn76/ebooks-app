import React from "react";

const chapters = [
  { id: "123", title: "chapter title", group: "idk", status: "locked", views: 1000, updated: "2 minutes ago" },
];

const ListChapter = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold text-purple-700">Danh sách</h2>

      <table className="w-full border-collapse border border-gray-200 mt-4 text-sm">
        <thead>
          <tr className="bg-pink-100 text-left">
            <th className="border border-gray-300 px-2 py-1">Chương</th>
            <th className="border border-gray-300 px-2 py-1">Tiêu đề</th>
            <th className="border border-gray-300 px-2 py-1">Nhóm dịch</th>
            <th className="border border-gray-300 px-2 py-1">Trạng thái</th>
            <th className="border border-gray-300 px-2 py-1">Lượt xem</th>
            <th className="border border-gray-300 px-2 py-1">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter, index) => (
            <tr
              key={index}
              className={`hover:bg-pink-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="border border-gray-300 px-2 py-1">{chapter.id}</td>
              <td className="border border-gray-300 px-2 py-1">{chapter.title}</td>
              <td className="border border-gray-300 px-2 py-1">{chapter.group}</td>
              <td className="border border-gray-300 px-2 py-1">
                <span className="text-gray-400">🔒</span>
              </td>
              <td className="border border-gray-300 px-2 py-1">{chapter.views}</td>
              <td className="border border-gray-300 px-2 py-1">{chapter.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
          Hiển thị tất cả
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Đi tới
        </button>
      </div>
    </div>
  );
};

export default ListChapter;

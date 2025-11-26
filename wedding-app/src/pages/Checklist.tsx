import { useState } from 'react';
import { useChecklistStore } from '../store/checklistStore';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const Checklist = () => {
  const { items, addItem, updateItem, deleteItem, toggleComplete } = useChecklistStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    dueDate: '',
  });

  const handleAdd = () => {
    if (!formData.title.trim()) return;

    addItem({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      dueDate: formData.dueDate,
      completed: false,
    });

    setFormData({ title: '', description: '', category: '', dueDate: '' });
    setShowAddForm(false);
  };

  const handleEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setFormData({
        title: item.title,
        description: item.description || '',
        category: item.category || '',
        dueDate: item.dueDate || '',
      });
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const handleUpdate = () => {
    if (!editingId || !formData.title.trim()) return;

    updateItem(editingId, {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      dueDate: formData.dueDate,
    });

    setFormData({ title: '', description: '', category: '', dueDate: '' });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', category: '', dueDate: '' });
    setEditingId(null);
    setShowAddForm(false);
  };

  const completedItems = items.filter((item) => item.completed);
  const pendingItems = items.filter((item) => !item.completed);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">준비 체크리스트</h1>
          <p className="text-gray-600 mt-2">
            완료: {completedItems.length} / {items.length}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> 항목 추가
        </button>
      </div>

      {/* 추가/수정 폼 */}
      {showAddForm && (
        <div className="card bg-blush-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {editingId ? '체크리스트 수정' : '새 체크리스트 추가'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="label">제목 *</label>
              <input
                type="text"
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="할 일을 입력하세요"
              />
            </div>

            <div>
              <label className="label">설명</label>
              <textarea
                className="input-field"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="상세 설명 (선택사항)"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">카테고리</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="예: 웨딩홀, 드레스, 스튜디오"
                />
              </div>

              <div>
                <label className="label">기한</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  placeholder="예: D-180, D-30"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="btn-primary flex-1"
              >
                {editingId ? '수정' : '추가'}
              </button>
              <button onClick={handleCancel} className="btn-secondary flex-1">
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 미완료 항목 */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          진행 중 ({pendingItems.length})
        </h2>
        {pendingItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 등록된 항목이 없습니다</p>
        ) : (
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="mt-1 w-5 h-5 text-blush-500 rounded focus:ring-blush-400"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    {item.category && <span>🏷️ {item.category}</span>}
                    {item.dueDate && <span>📅 {item.dueDate}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-500 hover:text-blue-600 p-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 완료 항목 */}
      {completedItems.length > 0 && (
        <div className="card bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            완료 ({completedItems.length})
          </h2>
          <div className="space-y-3">
            {completedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-white opacity-60"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="mt-1 w-5 h-5 text-blush-500 rounded focus:ring-blush-400"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 line-through">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;

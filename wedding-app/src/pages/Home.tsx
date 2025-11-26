import { useWeddingInfoStore } from '../store/weddingInfoStore';
import { useVenueStore } from '../store/venueStore';
import { useChecklistStore } from '../store/checklistStore';
import { useBudgetStore } from '../store/budgetStore';
import { useGuestStore } from '../store/guestStore';
import { FaHeart, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const Home = () => {
  const weddingInfo = useWeddingInfoStore();
  const venues = useVenueStore((state) => state.venues);
  const checklistItems = useChecklistStore((state) => state.items);
  const budgetItems = useBudgetStore((state) => state.items);
  const guests = useGuestStore((state) => state.guests);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    groomName: weddingInfo.groomName || '',
    brideName: weddingInfo.brideName || '',
    weddingDate: weddingInfo.weddingDate || '',
    totalBudget: weddingInfo.totalBudget || 0,
  });

  const daysUntil = weddingInfo.getDaysUntilWedding();
  const completedTasks = checklistItems.filter((item) => item.completed).length;
  const totalBudget = useBudgetStore.getState().getTotalBudget();
  const totalActual = useBudgetStore.getState().getTotalActual();
  const attendingGuests = useGuestStore.getState().getAttendingCount();

  const handleSave = () => {
    weddingInfo.updateInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* D-Day 카운터 */}
      <div className="card bg-gradient-to-r from-blush-100 to-lavender-100 border-none">
        <div className="text-center">
          <FaHeart className="text-6xl text-blush-400 mx-auto mb-4" />

          {!isEditing ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {formData.groomName && formData.brideName
                  ? `${formData.groomName} ❤️ ${formData.brideName}`
                  : '우리의 결혼을 준비해요'}
              </h1>

              {daysUntil !== null && (
                <div className="mt-4">
                  <p className="text-5xl font-bold text-blush-500 mb-2">D-{daysUntil}</p>
                  <p className="text-gray-600">
                    {new Date(formData.weddingDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-blush-500 hover:text-blush-600 flex items-center gap-2 mx-auto"
              >
                <FaEdit /> 정보 수정
              </button>
            </>
          ) : (
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="label">신랑 이름</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  placeholder="신랑 이름"
                />
              </div>

              <div>
                <label className="label">신부 이름</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  placeholder="신부 이름"
                />
              </div>

              <div>
                <label className="label">결혼식 날짜</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                />
              </div>

              <div>
                <label className="label">총 예산 (원)</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.totalBudget}
                  onChange={(e) =>
                    setFormData({ ...formData, totalBudget: Number(e.target.value) })
                  }
                  placeholder="총 예산"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={handleSave} className="btn-primary flex-1">
                  저장
                </button>
                <button onClick={() => setIsEditing(false)} className="btn-secondary flex-1">
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <h3 className="text-gray-600 text-sm mb-2">등록된 웨딩홀</h3>
          <p className="text-3xl font-bold text-blush-500">{venues.length}</p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 text-sm mb-2">체크리스트</h3>
          <p className="text-3xl font-bold text-blush-500">
            {completedTasks}/{checklistItems.length}
          </p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 text-sm mb-2">예산 집행률</h3>
          <p className="text-3xl font-bold text-blush-500">
            {totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totalActual.toLocaleString()} / {totalBudget.toLocaleString()}원
          </p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 text-sm mb-2">참석 하객</h3>
          <p className="text-3xl font-bold text-blush-500">
            {attendingGuests}/{guests.length}
          </p>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">시작하기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/map" className="p-4 border border-blush-200 rounded-lg hover:bg-blush-50 transition-colors">
            <h3 className="font-bold text-blush-600 mb-2">📍 웨딩홀 찾기</h3>
            <p className="text-sm text-gray-600">지도에서 웨딩홀을 찾아보세요</p>
          </a>

          <a href="/checklist" className="p-4 border border-blush-200 rounded-lg hover:bg-blush-50 transition-colors">
            <h3 className="font-bold text-blush-600 mb-2">✅ 준비 체크리스트</h3>
            <p className="text-sm text-gray-600">해야 할 일을 정리하세요</p>
          </a>

          <a href="/budget" className="p-4 border border-blush-200 rounded-lg hover:bg-blush-50 transition-colors">
            <h3 className="font-bold text-blush-600 mb-2">💰 예산 관리</h3>
            <p className="text-sm text-gray-600">예산을 계획하고 관리하세요</p>
          </a>

          <a href="/guests" className="p-4 border border-blush-200 rounded-lg hover:bg-blush-50 transition-colors">
            <h3 className="font-bold text-blush-600 mb-2">👥 하객 관리</h3>
            <p className="text-sm text-gray-600">하객 명단을 관리하세요</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Review from '@/components/Review';

const ShowTraineeProfile = () => {
  const location = useLocation();
  const { state } = location;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [performance, setPerformance] = useState('');
  const [currentPerformance, setCurrentPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/hrapi/perfomance/create/${state.id}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('TlToken')}`,
          },
        });
        setCurrentPerformance(response.data.data);
      } catch (error) {
        console.error('Failed to fetch performance data:', error);
      }
    };

    fetchPerformance();
  }, [state.id]);

  const openModal = () => {
    setPerformance(currentPerformance || '');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const method = currentPerformance ? 'patch' : 'post';
      const url = currentPerformance
        ? `http://127.0.0.1:8000/hrapi/perfomance/create/${state.id}/`
        : `http://127.0.0.1:8000/hrapi/perfomance/create/${state.id}/`;

      const response = await axios({
        method,
        url,
        data: { performance },
        headers: {
          'Authorization': `Token ${localStorage.getItem('TlToken')}`,
        },
      });

      setCurrentPerformance(response.data.data);
      closeModal();
    } catch (error) {
      console.error('There was an error!', error);
      setError('Failed to add performance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Profile */}
      <div className="p-6 max-w-lg mx-auto">
        <div>
          <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">
            {currentPerformance ? 'Edit Performance' : 'Add Performance'}
          </button>
        </div>
        <h1 className="text-3xl font-semibold text-center my-12">
          <span className="capitalize">{state.name}</span>&apos;s Profile
        </h1>
        <form className="flex flex-col gap-4">
          <img
            src="https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"
            alt="profile"
            className="rounded-full h-[170px] w-[170px] object-contain cursor-pointer self-center"
          />
          <label htmlFor="id">Trainee Id:</label>
          <input
            type="text"
            id="id"
            value={state.id}
            className="border p-3 rounded-lg"
            disabled
          />
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={state.name}
            className="border p-3 rounded-lg"
            disabled
          />
          <label htmlFor="email">Email Address:</label>
          <input
            type="text"
            id="email"
            value={state.email_address}
            className="border p-3 rounded-lg"
            disabled
          />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={state.phoneno}
            className="border p-3 rounded-lg"
            disabled
          />
        </form>
      </div>
      <Review id={state.id} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-6 rounded-lg z-10 max-w-md w-full">
            <button className="mb-4" onClick={closeModal}>Close</button>
            <h2 className="text-2xl mb-4">{currentPerformance ? 'Edit Performance' : 'Add Performance'}</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="performance">Performance:</label>
              <input
                type="text"
                id="performance"
                name="performance"
                value={performance}
                onChange={(e) => setPerformance(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTraineeProfile;

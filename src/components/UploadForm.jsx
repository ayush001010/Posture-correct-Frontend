import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/analyze/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFeedback(res.data.feedback);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Posture Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept="video/mp4" onChange={handleFileChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {feedback.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">Posture Feedback</h3>
          <ul className="list-disc ml-6">
            {feedback.map((item, index) => (
              <li key={index}>
                <strong>Frame {item.frame}:</strong> {item.issues.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadForm;

import React, { useState } from "react";
import axios from "axios";
import "./JobPost.css"; // Make sure the CSS file exists

const JobPost = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobBudget, setJobBudget] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/job-create",
        {
          title: jobTitle,
          description: jobDescription,
          budget: jobBudget,
          category: category,
          tags: tags,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSuccess(res.data.message);
        setJobTitle("");
        setJobDescription("");
        setJobBudget("");
        setCategory("");
        setTags("");
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="jobpost-background">
      {/* Decorative Images */}
      <img src="/images/left-top.png" className="background-image left-top" alt="Left Top" />
      <img src="/images/right-bottom.png" className="background-image right-bottom" alt="Right Bottom" />

      <div className="jobpost-container">
        <h1 className="jobpost-heading">Post a Job</h1>

        {error && <p className="jobpost-error">{error}</p>}
        {success && <p className="jobpost-success">{success}</p>}

        <form className="jobpost-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Job Title"
            className="jobpost-input"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <input
            type="text"
            className="jobpost-input"
            value={jobDescription}
            placeholder="Job Description"
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Job Budget"
            className="jobpost-input"
            value={jobBudget}
            onChange={(e) => setJobBudget(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="jobpost-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Tags"
            className="jobpost-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <button type="submit" className="jobpost-submit-button">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;

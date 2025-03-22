import React, { useState } from "react";
import styles from "./style.module.css";

const ExpenseForm = () => {
  const departments = [
    "HR",
    "IT",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
    "Engineering"
  ];

  const [formData, setFormData] = useState({
    employeeName: "",
    amount: "",
    reason: "",
    calendar: "",
    tripPlace: "",
    startTime: "",
    endTime: "",
    tripReason: "",
    numMembers: "",
    members: [{ name: "", department: "", id: "" }],
  });

  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedMembers = [...formData.members];
      updatedMembers[index][field] = e.target.value;
      setFormData({ ...formData, members: updatedMembers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: "", department: "", id: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request sent successfully!");
  };

  return (
    <div className={styles.container}>
      <h2>Hi, employee!</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Submit Expense Request</h3>
        <input type="text" name="employeeName" placeholder="Employee Name" onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
        <textarea name="reason" placeholder="Reason for expense" onChange={handleChange}></textarea>

        <h3>Business Trip Plan</h3>
        <input type="date" name="calendar" onChange={handleChange} />
        <input type="text" name="tripPlace" placeholder="Trip Place" onChange={handleChange} />
        <input type="datetime-local" name="startTime" onChange={handleChange} />
        <input type="datetime-local" name="endTime" onChange={handleChange} />
        <textarea name="tripReason" placeholder="Reason for the business trip" onChange={handleChange}></textarea>

        <h3>Trip Members</h3>

        {formData.members.map((member, index) => (
          <div key={index} className={styles.memberSection}>
            <input type="text" placeholder="Name" value={member.name} onChange={(e) => handleChange(e, index, "name")} />
            <select 
              value={member.department} 
              onChange={(e) => handleChange(e, index, "department")}
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>{dept}</option>
              ))}
            </select>
            <input type="text" placeholder="ID" value={member.id} onChange={(e) => handleChange(e, index, "id")} />
          </div>
        ))}

        <button type="button" className={styles.addButton} onClick={addMember}>
          + Add Member
        </button>
        <button type="submit" className={styles.submitButton}>Send</button>
      </form>
    </div>
  );
};

export default ExpenseForm;

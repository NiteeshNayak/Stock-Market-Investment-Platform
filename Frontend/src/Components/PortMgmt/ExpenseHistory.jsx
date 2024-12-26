import React from 'react';

const ExpenseHistory = ({ expenses }) => (
  <div className="expense-history">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          expenses.length > 0 ? (
            expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.id}</td>
                <td>{exp.description}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td>{new Date(exp.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No expenses available</td>
            </tr>
          )
        }
      </tbody>
    </table>
  </div>
);

export default ExpenseHistory;

// const ExpenseHistory = ({ expenses }) => (
//   <div className="expense-history">
//     <h3>Expense History</h3>
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Description</th>
//           <th>Amount</th>
//           <th>Date</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           expenses.length > 0 ? (
//             expenses.map((exp) => (
//               <tr key={exp.id}>
//                 <td>{exp.id}</td>
//                 <td>{exp.description}</td>
//                 <td>${exp.amount.toFixed(2)}</td>
//                 <td>{new Date(exp.timestamp).toLocaleString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No expenses available</td>
//             </tr>
//           )
//         }
//       </tbody>
//     </table>
//   </div>
// );

// export default ExpenseHistory;

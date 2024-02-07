// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <div className="success-container-2">
      <h1 className="head-1">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart width="1000" height={300}>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill=" #5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender

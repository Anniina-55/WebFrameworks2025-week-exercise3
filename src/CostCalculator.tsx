import { useState } from "react";

//constructor: costCalculator component takes the value of hourly cost of 1 vm, 
// given as prop in the App component
interface costCalculatorProps {
  priceOfSingleVMPerHour: number;
}

export default function costCalculator({ priceOfSingleVMPerHour }: costCalculatorProps) {
// array destructuring for useState: accepts integers as number of VMs and initial state 1 shows directly the hourly cost for user
  const [vmNumber, setVmNumber] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // input value is defined to be given as text but state is number -> convert value to number 
    const value = parseInt(event.target.value);
    // check for proper input value (can't be negative and other than number)
    if (value < 0 || isNaN(value)) {
        setVmNumber(0);
    } else {
        setVmNumber(value);
    }
  }

  /* calculatons for each cost periods can be done using current vmNumber
     stored in state variable (assuming the use is 24/7)*/
  const costPerHour = priceOfSingleVMPerHour * vmNumber; // use the given prop and calculate total cost of every machine given in input field
  const costPerDay = costPerHour * 24; // multiply hourly cost to match daily cost
  const costPerMonth = costPerDay * 30; // monthly cost
  const costPerYear = priceOfSingleVMPerHour * vmNumber * 8760; // yearly cost calculated directly from hours in a year

  // ui rendering: displays info headings, input field and result box (styled as a card)
  return (
    <div>
      <h1>VM cost calculator</h1>
      <h3>Calculate the cost of your virtual machines</h3>
        <p style={{marginTop: "-1rem", fontWeight: 200}}>(for light development/testing, assuming 24/7 usage)</p>
      <label htmlFor="vmNumber">Number of VMs:</label>
      <input
        type="text"
        id="vmNumber"
        placeholder="Number of VMs"
        value={vmNumber}
        onChange={handleChange}
      />
      <div className="resultBox">
        <h3>Cost summary</h3>
        <p>Cost per hour: {costPerHour} $</p>
        <p>Cost per day: {costPerDay} $</p>
        <p>Cost per month: {costPerMonth} $</p>
        <p>Cost per year: {costPerYear} $</p>
      </div>
    </div>
  );
}

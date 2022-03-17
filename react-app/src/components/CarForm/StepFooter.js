// export default function StepFooter({
//     nextStep,
//     prevStep,
//     step,
//     disabledStateOnStepper,
//   }) {
//     return (
//       <div className="btn-container">
//         <div className="button-holder">
//           <button
//               className="back-button"
//               disabled={step === 4}
//               style={{ visibility: step !== 0 ? "visible" : "hidden" }}
//               type="button"
//               onClick={prevStep}
//             >
//               Back
//           </button>
//         </div>
//         <div className="actualbtn">
//           <button
//             className="next-button"
//             disabled={disabledStateOnStepper()}
//             type="button"
//             onClick={nextStep}
//           >
//             {step === 3 ? "Submit Car" : "Next"}
//             {step === 4 ? " View Listings" : ""}
//           </button>
//         </div>
//       </div>
//     );
//   }

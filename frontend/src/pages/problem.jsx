/* eslint-disable react/prop-types */
export const Problem = ({p}) => {
return(
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h4 className="mt-5">{p.title}</h4>
                <hr /> 
                {p.io.map((io, index) => (
                    <div key={index}>
                        <h5 className="my-5">Example {index+1}</h5>
                        <h6>Input: {io.input.join(' ')}</h6>
                        <h6 className="mb-3">Output:  {io.output}</h6>
                    </div>
                ))}
            </div>
            <div className="col-6">
                <div className="col-3 my-3">
                    <select className = "form-select" aria-label="Default select example">
                        <option value="1">C++</option>
                        <option value="2">Java</option>
                        <option value="3">Python</option>
                    </select>
                </div>
                    <textarea rows={20} cols={50}></textarea>
                    <div>
                        <button type="submit" className="btn btn-primary my-3">Submit</button>
                    </div>
            </div>
        </div>        
    </div>
)
}
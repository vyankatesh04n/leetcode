/* eslint-disable react/prop-types */
export const ProblemList = ({problems}) => {

    return (
        <div className="container">
            <table className="table table-bordered table-striped">
                <thead className="text-center">
                    <tr>
                        <th>Title</th>
                        <th>Difficulty</th>
                        <th>Acceptance</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {problems.map((problem, index) => (
                        <tr key={index}>
                            <td>{problem.title}</td>
                            <td>{problem.difficulty}</td>
                            <td>{problem.acceptance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
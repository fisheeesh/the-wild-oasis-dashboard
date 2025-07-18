import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styled from "styled-components";
import emptyAnimation from '../assets/empty.lottie'

const NoActivity = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
`;

// eslint-disable-next-line react/prop-types
export default function EmptyChartData({ label }) {
    return (
        <NoActivity>
            <DotLottieReact
                style={{ width: '300px', height: '170px' }}
                src={emptyAnimation}
                loop
                autoplay
            />
            {label}
        </NoActivity>
    )
}

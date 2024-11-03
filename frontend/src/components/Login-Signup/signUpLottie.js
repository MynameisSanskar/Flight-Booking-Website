import React from 'react';
import Lottie from 'react-lottie';
import animationData from './signUp.json'; // Ensure the path to your JSON file is correct

export default function LottieAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie 
                options={defaultOptions}
                height={1500}
                width={1500}
            />
        </div>
    );
}

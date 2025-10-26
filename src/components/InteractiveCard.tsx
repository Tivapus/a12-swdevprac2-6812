"use client";

export interface InteractiveCardProps {
    children ?: React.ReactNode;
}

export default function InteractiveCard({children}: InteractiveCardProps) {
    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover') 
        {
            event.currentTarget.classList.remove('shadow-lg');
            event.currentTarget.classList.remove('bg-white');
            event.currentTarget.classList.add('shadow-2xl');
            event.currentTarget.classList.add('bg-neutral-200');
        } 
        else {
            event.currentTarget.classList.remove('shadow-2xl');
            event.currentTarget.classList.remove('bg-neutral-200');
            event.currentTarget.classList.add('shadow-lg');
            event.currentTarget.classList.add('bg-white');
        }
    }

    return (
        <div className="w-auto bg-white rounded-lg shadow-lg transition-all duration-300"
            onMouseOver={(e)=>onCardMouseAction(e)}
            onMouseOut={(e)=>onCardMouseAction(e)}
            >
            {children}
        </div>
    );
}
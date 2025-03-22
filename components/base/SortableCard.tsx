'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FilterCard from './FilterCard';
import { SxProps, Theme } from '@mui/material';

interface SortableCardProps {
    icon: React.ReactNode;
    name: string;
    count: number;
    selected?: boolean;
    onClick?: () => void;
    sx?: SxProps<Theme>;
    id: string;
}

const SortableCard: React.FC<SortableCardProps> = ({
    icon,
    name,
    count,
    selected = false,
    onClick,
    sx = {},
    id,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...sx,
    };

    return (
        <FilterCard
            icon={icon}
            name={name}
            count={count}
            selected={selected}
            onClick={onClick}
            sx={style}
            id={id}
            isDragging={isDragging}
            setNodeRef={setNodeRef}
            listeners={listeners}
            attributes={attributes}
        />
    );
};

export default SortableCard;


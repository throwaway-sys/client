import React, { useState } from 'react';
import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  Select,
  MenuItem,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { StarBorder } from '@mui/icons-material';

const Rooms = () => {
  const {
    state: { filteredRooms },
    dispatch,
  } = useValue();

  const [sortOption, setSortOption] = useState('recommended');

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    dispatch({ type: 'SORT_ROOMS', payload: value });
  };

  return (
    <Container>
      {/* Dropdown for sorting */}
      <Select
        value={sortOption}
        onChange={handleSortChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="recommended">Recommended</MenuItem>
        <MenuItem value="history">History</MenuItem>
        <MenuItem value="explore">Explore</MenuItem>
      </Select>

      {/* Room List */}
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {filteredRooms.map((room) => (
          <Card key={room._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={room.price === 0 ? 'Free Stay' : '$' + room.price}
                actionIcon={
                  <Tooltip title={room.uName} sx={{ mr: '5px' }}>
                    <Avatar src={room.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={room.images[0]}
                alt={room.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: room })}
              />
              <ImageListItemBar
                title={room.title}
                actionIcon={
                  <Rating
                    sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                    name="room-rating"
                    defaultValue={room.rating}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Rooms;

import Room from '../models/Rooms';

import imagesView from './images_view';

export default {
    render(room: Room) {
        return {
            id: room.id,
            name: room.name,
            campus: room.campus,
            latitude: room.latitude,
            longitude: room.longitude,
            weight: room.weight,
            description: room.description,
            image: imagesView.renderMany(room.images)
        };
    },

    renderMany(rooms: Room[]) {
        return rooms.map(room => this.render(room));
    }
}
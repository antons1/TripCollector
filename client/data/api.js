import _pick from 'lodash/fp/pick';

import trips from './trips.json';
import connections from './connections.json';
import points from './points.json';
import sources from './sources.json';
import users from './users.json';

export function getTrip(id) {
    const trip = trips.find((trip) => trip.id === id);

    const users = trip.userIds.map((id) => _pick(["id", "name", "location"], getUser(id)));
    const points = trip.pointIds.map((id) => getPoint(id));

    const from = new Date(trip.from);
    const to = new Date(trip.to);
    return {
        id: trip.id,
        name: trip.name,
        users,
        from: `${from.getDate()}.${from.getMonth()+1}.${from.getFullYear()}`,
        to: `${to.getDate()}.${to.getMonth()+1}.${to.getFullYear()}`,
        points
    }
}

export function getUser(id) {
    return users.find((user) => user.id === id);
}

export function getPoint(id) {
    return points.find((point) => point.id === id);
}
#ifndef BLUZELLE_RAFTLEADERSTATE_H
#define BLUZELLE_RAFTLEADERSTATE_H

#include <boost/asio/deadline_timer.hpp>

#include "RaftState.h"

class RaftLeaderState : public RaftState
{
private:
    boost::asio::deadline_timer heartbeat_timer_;
    void heartbeat();

public:
    RaftLeaderState(boost::asio::io_service& ios,
                    Storage& s,
                    CommandFactory& cf,
                    ApiCommandQueue& pq,
                    PeerList& ps);

    virtual unique_ptr<RaftState> handle_request(const string& request, string& response);
};

#endif //BLUZELLE_RAFTLEADERSTATE_H
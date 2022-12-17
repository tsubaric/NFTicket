from brownie import Ticket
from scripts.helpers import get_account

def main():
    account = get_account()
    ticket = deploy_ticket(account)
    print('TICKET: ', ticket)


def deploy_ticket(acct):
    return Ticket.deploy({'from': acct})
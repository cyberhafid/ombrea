"""Initial migration – create farmer and site tables, seed data

Revision ID: 0001
Revises:
Create Date: 2025-01-07 10:54:00.000000

"""
from random import randint
from typing import Sequence, Union

import factory
import factory.alchemy
import sqlalchemy as sa
from alembic import op
from sqlalchemy.orm import DeclarativeBase, Session, relationship

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# ---------------------------------------------------------------------------
# Lightweight model classes used only inside this migration
# ---------------------------------------------------------------------------

class _Base(DeclarativeBase):
    pass


class _Farmer(_Base):
    __tablename__ = "farmer"
    id = sa.Column(sa.BigInteger, primary_key=True, autoincrement=True)
    first_name = sa.Column(sa.String, nullable=False)
    last_name = sa.Column(sa.String, nullable=False)
    sites = relationship("_Site", back_populates="farmer")


class _Site(_Base):
    __tablename__ = "site"
    id = sa.Column(sa.BigInteger, primary_key=True, autoincrement=True)
    name = sa.Column(sa.String, nullable=False)
    farmer_id = sa.Column(sa.BigInteger, sa.ForeignKey("farmer.id"), nullable=False)
    farmer = relationship("_Farmer", back_populates="sites")


def upgrade() -> None:
    op.create_table(
        "farmer",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "site",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("farmer_id", sa.BigInteger(), nullable=False),
        sa.ForeignKeyConstraint(["farmer_id"], ["farmer.id"], ondelete="RESTRICT"),
        sa.PrimaryKeyConstraint("id"),
    )

    bind = op.get_bind()
    session = Session(bind=bind)

    class FarmerFactory(factory.alchemy.SQLAlchemyModelFactory):
        first_name = factory.Faker("first_name")
        last_name = factory.Faker("last_name")

        class Meta:
            model = _Farmer
            sqlalchemy_session = session
            sqlalchemy_session_persistence = "commit"

    class SiteFactory(factory.alchemy.SQLAlchemyModelFactory):
        name = factory.Faker("city")
        farmer = factory.SubFactory(FarmerFactory)

        class Meta:
            model = _Site
            sqlalchemy_session = session
            sqlalchemy_session_persistence = "commit"

    [SiteFactory() for _ in range(randint(5, 10))]


def downgrade() -> None:
    op.drop_table("site")
    op.drop_table("farmer")

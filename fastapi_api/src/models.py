from sqlalchemy import Integer, Column, String, ForeignKey
from sqlalchemy.orm import relationship

from src.database import Base


class Farmer(Base):
    __tablename__ = "farmer"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    sites = relationship("Site", back_populates="farmer")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Site(Base):
    __tablename__ = "site"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    farmer_id = Column(
        Integer,
        ForeignKey("farmer.id", ondelete="RESTRICT"),
        nullable=False,
    )

    farmer = relationship("Farmer", back_populates="sites")
